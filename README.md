# 配送时间选择器

## 如何在本地运行
* 1、安装[Taro脚手架](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)。这里使用的Taro版本是2.1。如果不是2.1版本，请查看[这里](https://taro-docs.jd.com/taro/docs/GETTING-STARTED#%E4%BF%9D%E6%8C%81-tarojscli-%E7%9A%84%E7%89%88%E6%9C%AC%E4%B8%8E%E5%90%84%E7%AB%AF%E4%BE%9D%E8%B5%96%E7%89%88%E6%9C%AC%E4%B8%80%E8%87%B4)。
* 2、安装[Mobx](https://taro-docs.jd.com/taro/docs/mobx)
* 3、下载[微信小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
* 4、打开工具，加载项目，并执行``` npm run dev:weapp ```

## 功能
* 根据用户当前时间来动态渲染可配送时间

* 配送开始时间从早上7:30至晚上20:00。首先会获取当前时间，往后增加30分钟则为默认配送时间。如果该时间已超过当天的20:00。配送时间默认为明日的7:30

* 配送时间间隔为30分钟

* 如果当前时间已晚于20:00，左侧时间则不展示“今日”，返则展示

* 组件返回的deliverTime单位为秒

## 说明
一开始本想用原生的Pickek选择器来实现，但发现不好用。在之前也去网上找了很多，都不满意。后来就自己决定做一个。
这个组件只提供实现的思路，仅供参考，也欢迎指正问题。
如果有更好的方案请联系我
