import * as ffi from "ffi-napi";

const MAC_LOGIN_LIB = "/System/Library/PrivateFrameworks/login.framework/Versions/Current/login";
const WINDOWS_LOGIN_LIB = "user32.dll";

/**
 * Error that will be thrown if login fails.
 */
export class UnableToLockScreenError extends Error {
    constructor(message: string) {
        super(`An attempt to lock the screen failed: ${message}`);
    }
}

/**
 * Error that will be thrown if platform is not supported.
 */
export class PlatformNotSupportedError extends Error {
    constructor(platform: string) {
        super(`Platform "${platform}" is not supported`);
    }
}

/**
 * Locks screen running Windows.
 */
export function lockWindows(): void {
    try {
        const user32 = ffi.Library(WINDOWS_LOGIN_LIB, {
            LockWorkStation: [ "bool", [] ]
        });

        user32.LockWorkStation();
    } catch (error) {
        throw new UnableToLockScreenError(error.message);
    }
}

/**
 * Locks screen running MacOS.
 */
export function lockMacOS(): void {
    try {
        const login = ffi.Library(null, {
            'SACLockScreenImmediate': [ 'int', [] ]
        }, ffi.DynamicLibrary(MAC_LOGIN_LIB));

        login.SACLockScreenImmediate();
    } catch (error) {
        throw new UnableToLockScreenError(error.message);
    }
}

/**
 * Locks the screen.
 */
export function lockScreen(): void {
    if (process.platform === "darwin") 
        return lockMacOS();
    else if (process.platform === "win32") 
        return lockWindows();
    else
        throw new PlatformNotSupportedError(process.platform);
}
