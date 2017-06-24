// @flow
import {WEB_NAME,TITLE_SEPARATOR} from '../config';

export default function createTitleFromState(state):string {
    let titleParts = [];

    titleParts.push(WEB_NAME);

    return titleParts.join(TITLE_SEPARATOR);
}