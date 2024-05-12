import { App } from 'vue';
import Cookies from 'js-cookie';

// 定义插件选项的接口
interface CookiePluginOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

// 定义插件的类
class CookiePlugin {
  // 安装方法
  public static install(app: App, options?: CookiePluginOptions) {
    // 设置默认的cookie
    app.config.globalProperties.$setDefaultCookie = function(name: string, value: any) {
      if (!Cookies.get(name)) {
        Cookies.set(name, value, options);
      }
    };

    // 读取cookie的方法
    app.config.globalProperties.$getCookie = function(name: string) {
      return Cookies.get(name);
    };

    // 删除cookie的方法
    app.config.globalProperties.$removeCookie = function(name: string) {
      Cookies.remove(name);
    };
  }
}

// 导出插件
export default CookiePlugin;
