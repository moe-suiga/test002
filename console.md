---
title: console function
descrtion: 控制台的一些方法记录
---

## 控制台console的一些方法

1. console.log

在控制台打印内容，一般的用法就是`console.log(info[,info,...])`。
然后还有一个比较有趣的用法，第一个参数中可以包含格式化占位符。

```
var lover = 'someone';
console.log('I love %s and she love me too', lover);
//=> I love someone and she love me too
```

格式化占位符列表：

| 占位符 |          意义          |
|--------|------------------------|
|   %s   |          字符串        |
| %d, %i | 整型（暂不支持数字型） |
|   %f   |浮点型（暂不支持数字型）|
|   %o   |         链接对象       |
|   %c   |     CSS格式字符串      |

可以通过`%c`占位符给输出的文本添加一些样式，比如更大的字号、更醒目的颜色、添加背景色等，使得输出更加醒目。

2. console.debug/console.info

console.log的别名，不过console.info会在输出的文本前加上一个小三角标示。

3. console.warn

在控制台输出一条带有“警告”图标的消息和一个指向该代码调用的追溯引用信息

4. console.error

在控制台输出一条带有“错误”图标的消息和一个指向该代码调用的追溯引用信息

5. console.trace

在控制台输出该代码调用的追溯引用信息

6. console.time/console.timeEnd

`console.time(name)`创建一个名字为name的计时器，`console.timeEnd(name)`停止该计时器，并输出从创建到停止所耗的时间（毫秒）。常用来查看代码运行的效率性能。

7. console.group/console.groupEnd/console.groupCollapsed

`group`方法输出一条消息，并打开一个嵌套块，块中的内容都会缩进，调用`console.groupEnd()`关闭块。
`groupCollapsed`方法与`group`方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的，而不是展开的。

8. console.profile/console.profileEnd

`console.profile([title])`打开JavaScript性能测试开关，可选参数title会在打印性能测试报告时在报告的开头输出。

打开浏览器的开发者工具，右上角的三个点 => `More Tools` => `JavaScript Profiler`面板中，可以看到这个性能调试器的运行结果。

9. console.table

对于某些复合类型的数据，`console.table(object)`方法可以将其转为表格显示。条件是必须拥有主键。
对于数组来说，主键就是数字键；对于对象来说，主键就是它的最外层键。

```
var o = {
    arr: [5, 4, 3, 2, 1],
    str: 'string',
    num: 123,
    bool: true,
    null: null
};
console.table(o);
/*
    ---------------------------------------------------
    | (index) | 0 | 1 | 2 | 3 | 4 | length |   Value  |
    |-------------------------------------------------|
    | arr     | 5 | 4 | 3 | 2 | 1 |    5   |          |
    | str     |   |   |   |   |   |        | "string" |
    | num     |   |   |   |   |   |        | 123      |
    | bool    |   |   |   |   |   |        | true     |
    | null    |   |   |   |   |   |        | null     |
    ---------------------------------------------------
    > object
 */
```

10. console.count

计数器，输出它被调用了多少次，有一个可选参数，会在显示计数时在开头输出，并用于区分不同的计数器。

11. console.dir/console.dirxml

`dir`方法用来对一个对象进行检查，并以易于阅读和打印的格式显示，该方法对于输出DOM对象非常有用。
`dirxml`方法主要用于以目录树的形式，显示DOM节点。如果参数不是DOM节点，而是普通的JavaScript对象，`console.dirxml`等同于`console.dir`。

12. console.assert

`assert`方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序的执行。这样就相当于提示用户，内部状态不正确。

它接收两个参数，第一个是表达式，第二个是字符串。只有当第一个参数为`false`时，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```
console.assert(1 > 2, '判断错误');
//=> Assertion failed: 判断错误

// 相当于
try {
  if (1 > 2) {
    throw new Error('判断错误');
  }
} catch(e) {
  console.error(e);
}
```

13. console.clear

clear方法用于清除当前控制台的所有输出，将光标回置到第一行。
