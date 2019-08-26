# TooNote - WebClient

web client, also applied in electron and webview based desktop app. 

基于Web的小兔笔记客户端实现，也应用于electron和用webview构建的桌面app。

## 架构

分层：

- UI层：负责用户状态、笔记列表、后台任务、笔记编辑、笔试预览的展示
- 逻辑层：负责更新应用状态，对接模型层
- 模型层：按不同平台做不同实现，负责本地缓存、数据存储、网络连接等

分层次构建：

- Lite版：UI层+逻辑层+本地存储，不需要登录联网、数据存储在本地
- Full版：UI层+逻辑层+网络存储，需要联网，数据与后台同步

## UI层

## 逻辑层

- 应用状态管理

## 模型层

- 数据加密管理
