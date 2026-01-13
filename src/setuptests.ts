import "whatwg-fetch";
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for react-router + firebase
import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
