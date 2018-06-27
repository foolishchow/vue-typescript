import { AjaxGetUriItem, AjaxPostUriItem } from 'internal/ajax';
import { LoginResponse, LoginParam } from './responses/login';
import { CommonResponse } from './responses/common';


export const BasicLogin: AjaxPostUriItem<LoginResponse, LoginParam> = "/user-login";

export const BasicInfo: AjaxGetUriItem<CommonResponse, { token: string }> = '/common-info';
