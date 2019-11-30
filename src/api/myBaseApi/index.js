/**
 * 
 * 封装Axios
 * 
 */

import axios from "axios";
import router from "@/router";
import { Message } from "element-ui";

//默认8秒超时
axios.defaults.timeout = 8000;

// 添加请求拦截器
axios.interceptors.request.use(config => {
    let token = null;
    if (sessionStorage.getItem("token")) {
        token = sessionStorage.getItem("token");
    }
    config.headers.token = token;
    return config;
});




export default function baseApi(url, data = {}, type = "GET") {

    return new Promise((resolve) => {
        let promise = null;
        //1、执行ajax请求
        if (type === "GET") {
            promise = axios.get(url, {
                params: data
            });
        } else if (type === "PUT") {
            promise = axios.put(url, data,
                {
                    headers: { "content-type": "application/json;charset=uft-8" }
                }
            );
        } else if (type === "POST") {
            promise = axios.post(url, data, {
                headers: { "content-type": "application/json;charset=uft-8" }
            }
            );
        } else {
            promise = axios.delete(url, data,{
                headers: { "content-type": "application/json;charset=uft-8" }
            });
        }

        //2、如果成功则调用resolve
        promise.then(respone => {
            resolve(respone);
        }).catch(error => {
            console.log(error);
            // console.log(error.response);
            if (error && error.response.status) {
                switch (error.response.status) {
                    case 401:
                        //401：未登录/登录过期
                        Message.error("未登录/登录过期");
                        if (sessionStorage.getItem("token")) {
                            sessionStorage.setItem("token", null);
                        }

                        router.push({
                            name:"login",
                            params:{
                                lastPath:router.path
                            }
                        });
                        break;
                    default:
                        Message({
                            // message: error.response.data.message + "\t错误代码：" + error.response.status,
                            type: "error"
                        });
                        break;

                }
            }
        });
        return promise;
    });

}

