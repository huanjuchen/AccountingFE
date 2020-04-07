/**
 * 
 * 封装Axios
 * 
 */
import axios from "axios";
import router from "@/router";
import { Message } from "element-ui";


const urlPrefix="/api";

// const urlPrefix="";

//默认8秒超时
axios.defaults.timeout = 8000;

// 添加请求拦截器
axios.interceptors.request.use(config => {
    let tokenId = null;
    if (sessionStorage.getItem("token_id")) {
        tokenId = sessionStorage.getItem("token_id");
    }
    config.headers.token_id = tokenId;
    return config;
});

export default function baseApi(url, data = {}, type = "GET",contentType) {
    url=urlPrefix+url;

    if (!contentType){
        contentType="application/json;charset=utf-8";
    }

    return new Promise((resolve) => {
        let promise = null;
        //1、执行ajax请求
        if (type === "GET") {
            promise = axios.get(url, {
                headers: { "content-type": contentType }
            });
        } else if (type === "PUT") {
            promise = axios.put(url, data,
                {
                    headers: { "content-type": contentType }
                }
            );
        } else if (type === "POST") {
            promise = axios.post(url, data, {
                    headers: { "content-type": contentType }
            }
            );
        } else {
            promise = axios.delete(url,  {
                headers: { "content-type": contentType }
            });
        }

        //2、如果成功则调用resolve
        promise.then(response => {
            if(response&&response.status===200&&response.data){
                if(response.data.code===200){
                    resolve(response);
                }else if(response.data.code===401){
                    Message.error("未登录/登录过期");
                    if (sessionStorage.getItem("token_id")) {
                        sessionStorage.removeItem("token_id");
                    }

                    if (sessionStorage.getItem("user")) {
                        sessionStorage.removeItem("user");
                    }

                    router.push({
                        name: "login",
                        params: {
                            lastPath: router.path
                        }
                    });
                }else{
                    Message({
                        message: response.data.msg+ "\t错误代码：" + response.data.code,
                        type: "error"
                    });
                }   
            }    
        }).catch(error => {
            console.log(error);
            Message({
                message: "请求出现了一个错误，请稍后重试",
                type: "error"
            });
        });
        return promise;
    });

}

