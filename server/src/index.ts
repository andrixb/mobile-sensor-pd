import { PdSensorServer } from './pd-sensor-server';

let app = new PdSensorServer().getApp();
export { app };
