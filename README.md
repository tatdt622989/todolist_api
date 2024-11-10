# ToDoList API

這是一個簡單的待辦事項 API，允許用戶創建、讀取、更新和刪除待辦事項。

## 功能

- 用戶註冊
- 創建新的待辦事項
- 獲取所有待辦事項
- 更新待辦事項
- 刪除待辦事項

## 安裝

1. 克隆這個倉庫
  ```bash
  git clone https://github.com/yourusername/todolist_api.git
  ```
2. 進入專案目錄
  ```bash
  cd todolist_api
  ```
3. 安裝依賴
  ```bash
  npm install
  ```

## 使用

1. 啟動服務器
  ```bash
  node app.js
  ```
2. 填寫.env如下
  ```bash
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/todolist
  JWT_SECRET=your_secret
  ```