import express from "express";
import { City } from "../models/city";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string>
      uid?: Record<string>
      req?: Request
      city: City
      cityName: string
      name: string
    }
  }
}