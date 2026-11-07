// see variables.scss
export function getWidth(showIncrement: boolean, showComment: boolean): number {
    if (showIncrement && showComment) {
        return 180;
    }
    if (showIncrement) {
        return 140;
    }
    if (showComment) {
        return 140;
    }
    return 100;
}

export function getWidthClass(showIncrement: boolean, showComment: boolean): string {
    if (showIncrement && showComment) {
        return 'show-increment-comment';
    }
    if (showIncrement) {
        return 'show-increment';
    }
    if (showComment) {
        return 'hide-increment-comment';
    }
    return 'hide-increment';
}

export function getWidthBorderClass(showIncrement: boolean, showComment: boolean): string {
    if (showIncrement && showComment) {
        return 'show-increment-comment-border';
    }
    if (showIncrement) {
        return 'show-increment-border';
    }
    if (showComment) {
        return 'hide-increment-comment-border';
    }
    return 'hide-increment-border';
}
