/* dit is een voorbeeld van het exporteren van losse functies in plaats van een class - wordt nu niet gebruikt */
export function addNumber(a: number, b: number) {
    return a + b
}

export function subtractNumber(a: number, b: number) {
    return a - b
}

/* gebruiken in app.ts of ander component */
/* 
import { addNumber, subtractNumber } from '../services/DataService';
let r = addNumber(3, 5)
*/