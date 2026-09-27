import { Request, Response } from "express";
export declare const createCampusController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCampusesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMyCampusesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCampusByIdController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCampusBySlugController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCampusController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCampusController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
