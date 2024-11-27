export function conflictError(entity: string) {
    return {
        type: "conflict",
        message: `News with title ${entity} already exist.`
    }
}

export function badRequestText() {
    return {
        type: "badRequestText",
        message: `The news text must be at least 500 characters long.`
    };
}

export function badRequestDate() {
    return {
        type: "badRequestDate",
        message: `The publication date cannot be in the past.`
    };
}

export function notFoundError(entity: number) {
    return {
        type: "notFound",
        message: `News with id ${entity} not found.`
    }
}