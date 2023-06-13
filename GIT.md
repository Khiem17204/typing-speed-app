# How to use Git like a pro

## Local and Remote

If you will fork this repo: 

check where your repo is:

```
git remote show origin
```

don't forget to add the original repo (Khiem's repo) as upstream in case you want to commit to your branch here:

```
git add upstream https://github.com/Khiem17204/typing-speed-app.git
```

check where the upstream is to verify:

```
git remote show upstream
```

*Note*: origin hay remote thì cũng chỉ là variable thôi, để ý khi push/ merge nhé.

push to origin (or upstream)

```
git add .
git commit -m "<write a clear message here"
git push origin <branch>
```
or ` git push upstream <branch`

## Branch

### Creating branches
#### Using GitHub interface

Click on the `branch icon > view all branches > new branch`

#### Using Terminal

```
git checkout -branch <branch-name>
```

*Note*: Trong project này mình chỉ tạo branch ở repo của Khiêm duy nhất 1 lần thôi, và đó là branch để tên các ông và để các ông push local code khi các ông ưng ý nhất. Vì thế khi tạo branch mới, sử dụng github interface khi tạo branch trên repo của Khiêm và (nếu muốn) thì chỉ dùng terminal ở repo của các ông nhé

Switching between branches:

```
git checkout <branch-name
```

## Pull Requests

When you push codes from an alternate branch (or repo), you will likely see GitHub notifying you of code changes like this:
![image](https://github.com/Khiem17204/typing-speed-app/assets/60612625/d3b555ab-70c1-4f13-9418-284a543b659d)

Click on the `Compare and create pull request` button and create a pull requests

![image](https://github.com/Khiem17204/typing-speed-app/assets/60612625/9012a96d-4bc5-404c-b569-5f7300f9f469)

*Note:* Workflow của mình sẽ là như này: để dễ merge vào file tổng, thì các ông sẽ push vào local repo (đã fork về), sửa chữa các thứ các thứ, rồi khi thực sự ưng ý thì mở pull request vào branch có tên các ông trên repo của Khiêm. Sau đó thì tự accept pull request trên branch đó. Tiếp tục mở pull request từ branch của ông đến main branch để tui review code và duyệt code nhé ✔️

## Issues

Like a forum, just go there and ask questions



