import express, { Application } from "express";
import cors from 'cors';

export function appConfig(app: Application) {
    return app.use(
        cors(),
        express.json()
    )
}