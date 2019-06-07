// 模板字符串
let name = 'liaojin',
    age = 21;
console.log(`名字${name},年龄${age}`); // 名字liaojin,年龄21

// 模板字符串会保留换行和空格，如果不想要使用.trim()去掉即可
$('#list').html(`<ul>
    <li>first</li>
    <li>second</li>
</ul>`.trim());

