# JiKongjian_Episode_Batch
用于网页版极空间-极影视批量修改集数的油猴脚本。

## 如何安装/使用脚本？

要使用任何脚本，首先需要浏览器安装 **Tampermonkey  脚本管理器扩展（[Chrome](https://pan.lanzouv.com/b073l8d1e)** / **[Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)** / **[Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd?hl=zh-CN)）。**  

> _其他基于 **Chromium** 内核的浏览器（如国内套皮浏览器）一般都可以使用 Chrome 扩展。_  
> _请确保使用 **Tampermonkey 正式版** 扩展，其他的用户脚本管理器可能导致**无法正常使用**脚本。_  
> _如果要重装脚本，请记得在 Tampermonkey 扩展的**回收站中彻底删除**脚本后再去重新安装脚本。_  
> _**不会离线安装 .crx 扩展？[Chrome、Edge 重新开启隐藏的 [拖入安装 .crx 扩展] 功能！](https://zhuanlan.zhihu.com/p/276027099)**_  
****

## 极影视存在的问题

 > _自动匹配集数比较傻缺，而改起来又相当麻烦，只能一个个修改集数。_  
 > _有时下载下来的 **BDRip** 会包含许多特典，但极影视一股脑儿地和正片全塞到一起了，一个个移出去不停地点确认很麻烦。_
 
****

## 使用方法

1.在Tampermonkey的脚本管理界面中新建一个脚本，将Main.js的内容全部复制进去，保存。

2.在这个脚本的设置中，将“仅在顶层页面（框架）运行:”改为“否”（非必要）。

3.在极空间网页版中登录后，打开极影视，这时极影视界面的右上角就出现了“显示隐藏”按钮，这时展开的话会发现里面是空的。

3.1.在登录后，手动在链接栏输入http(s)://{你的极空间IP:端口}/home/video直接进入极影视，一样的。

4.打开某个剧集列表，再点右上角“显示隐藏”展开界面，如果配置正确，应该已经捕获了响应的列表，具体怎么用自己尝试~注意所有操作都不会实时反应在界面上，要重新打开剧集列表才能看到。

##  一些更新地址

[地址1](https://jsd.cdn.zzko.cn/gh/sunjx17/JiKongjian_Episode_Batch@main/Main.js)
[地址2](https://raw.kgithub.com/sunjx17/JiKongjian_Episode_Batch/main/Main.js)
[地址3](https://ghproxy.net/https://raw.githubusercontent.com/sunjx17/JiKongjian_Episode_Batch/main/Main.js)
[地址4](https://fastly.jsdelivr.net/gh/sunjx17/JiKongjian_Episode_Batch@main/Main.js)

##  依赖

* jQuery 
* jQuery.cookie
* ajaxhook.js

##  开源协议

MIT

##  免责声明

+ 脚本仍然存在一些Bug，介意勿用。
+ 如果因为使用本脚本导致您的数据产生任何损失，概不负责。
