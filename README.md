# qq-mail-adblock

新版 QQ 邮箱 VIP 广告屏蔽规则，两种安装方式选一个即可：**广告过滤插件订阅** 或 **油猴脚本**，两份用的是同一套选择器。

## 安装方式一：广告过滤插件订阅

订阅地址：

```
https://raw.githubusercontent.com/zhaojiannet/qq-mail-adblock/main/qq-mail-adblock.txt
```

### Adblock Plus / uBlock Origin

1. 打开扩展设置
2. 找到「过滤规则订阅」或「Filter lists」
3. 添加自定义订阅，粘贴上方订阅地址

### AdGuard

1. 打开 AdGuard 设置
2. 进入「过滤器」→「自定义」
3. 点击「添加自定义过滤器」
4. 粘贴订阅地址

### Brave 浏览器

1. 进入 `brave://adblock`
2. 在「Custom filters」中添加订阅地址

> 提示：不同过滤器对扩展语法（如 `:has-text`）支持程度不一，如果某条规则未生效，可以改用下方油猴脚本。

## 安装方式二：油猴脚本

适用于 Tampermonkey、Violentmonkey、Userscripts (Safari) 等用户脚本管理器。

**推荐：通过 Greasy Fork 安装**（一键安装，附带版本历史和反馈区）

> https://greasyfork.org/zh-CN/scripts/575693

也可以直接用 GitHub 原始地址（管理器会自动识别）：

```
https://raw.githubusercontent.com/zhaojiannet/qq-mail-adblock/main/qq-mail-adblock.user.js
```

脚本内置了 `@updateURL`，安装后会随仓库更新自动升级。

### 调试模式

在 QQ 邮箱页面的浏览器控制台执行下面这行，刷新后能看到命中日志：

```js
localStorage.setItem('qq-mail-adblock-debug', '1')
```

关闭：`localStorage.removeItem('qq-mail-adblock-debug')`

## 屏蔽范围

| 位置 | 说明 |
|------|------|
| 头像左侧 | VIP 浮动气泡 |
| 头像弹出 | 个人信息面板中的 VIP 推广 |
| 应用容量 | 容量提示区域 |
| 设置-顶部 | VIP 横幅广告 |
| 设置-容量 | 容量扩展推广 |
| 设置-主题 | VIP 主题推荐 |
| 设置-发信 | 发信相关推广 |
| 设置-查询 | 自助查询页面推广 |

## 兼容性

过滤规则订阅（`qq-mail-adblock.txt`）已测试：
- Adblock Plus
- Brave 浏览器内置广告拦截
- uBlock Origin

油猴脚本（`qq-mail-adblock.user.js`）目标兼容：
- Tampermonkey（Chrome / Edge / Firefox）
- Violentmonkey
- Userscripts（Safari / iOS）

> 油猴脚本依赖原生 CSS `:has()` 选择器，需 Chrome 105+ / Safari 15.4+ / Firefox 121+。

## 相关文章

- [新版QQ邮箱VIP广告屏蔽规则](https://www.zhaojian.net/new-qq-mail-vip-adblock-rules/)

## 贡献

欢迎提交 Issue 或 Pull Request：
- 发现新的广告元素
- 规则失效反馈
- 改进建议
