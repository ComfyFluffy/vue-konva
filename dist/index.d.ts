import { KonvaNodeConstructor } from './types';
declare const VueKonva: {
    install: (app: any, options?: {
        prefix?: string;
        customNodes?: Record<string, KonvaNodeConstructor>;
    }) => void;
};
export default VueKonva;
