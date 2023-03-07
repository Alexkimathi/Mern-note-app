import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import { assertDefined } from './../util/assertDefined';



export const getNotes:RequestHandler = async (req, res, next)=>{
    const autheticatedUserId = req.session.userId
    

    try {

        assertDefined(autheticatedUserId)
        
        const notes = await NoteModel.find({userId:autheticatedUserId}).exec();
        res.status(200).json(notes)
        
    } catch (error) {
        next(error) 
    }
   
};

export const getNote: RequestHandler = async(req,res,next) =>{
    const noteId =req.params.noteId;
    const autheticatedUserId = req.session.userId

    try {
        assertDefined(autheticatedUserId)


        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError (400, "invalid note id")
        }
        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, "Note not found");
        }

        if(!note.userId?.equals(autheticatedUserId)){
            throw createHttpError(401, "you cannot access this note")
        }
        res.status(200).json(note);
        
        
    } catch (error) {
        next(error)
        
    }
};

interface CreateNoteBody {
    title?: string,
    text?: string,
}


export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req,res,next) =>{
    const title = req.body.title;
    const text = req.body.text;

    const autheticatedUserId = req.session.userId

    try {
        assertDefined(autheticatedUserId)

        if(!title){
            throw createHttpError(400, "Note must have a title");
        }
        const newNote = await NoteModel.create({
            userId: autheticatedUserId,
            title: title,
            text: text,
        });

        res.status(201).json(newNote)
        
        
    } catch (error) {
        next(error)
        
    }
};


interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown> = async(req,res,next)=>{
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const autheticatedUserId = req.session.userId

    try {
        assertDefined(autheticatedUserId)


        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError (400, "invalid note id")
        }

        if(!newTitle){
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, "Note not found");
        }
        if(!note.userId?.equals(autheticatedUserId)){
            throw createHttpError(401, "you cannot access this note")
        }
        
        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error)
        
    }
};

export const deleteNote: RequestHandler = async(req,res, next) =>{
    const noteId = req.params.noteId;
    const autheticatedUserId = req.session.userId


    try {
        assertDefined(autheticatedUserId)

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError (400, "invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, "note not found!");
        }

        if(!note.userId?.equals(autheticatedUserId)){
            throw createHttpError(401, "you cannot access this note")
        }

        await note.remove();

        res.sendStatus(204);

    } catch (error) {
        next(error)
        
    }
}
