import { AjaxGetUriItem, AjaxPostUriItem } from 'internal/ajax';
import { LoginResponse, LoginParam } from './responses/login';

//	登录接口
export const Login: AjaxPostUriItem<LoginResponse, LoginParam> = "/basic/token";

