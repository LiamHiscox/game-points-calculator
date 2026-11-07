// see variables.scss
export function getWidthClass(showIncrement: boolean, showComment: boolean) {
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

export function getWidthBorderClass(showIncrement: boolean, showComment: boolean) {
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
