$(function(){
  var form =layui.form
  var layer=layui.layer
  form.verify({
    nickname:function(value){
      if(value.length>6){
        return`昵称长度必须在1到6个字符之间！`
      }
    }
  })
  initUserInfo()
  // 初始化用户的基本星系
function initUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    success:function(res){
      if(res.status !==0){
        return layer.msg('获取用户信息失败！')
      }
      form.val('formUserInfo',res.data)
      // console.log(res.data);
      // debugger
      
    }
  })
}
// 重置表单的数据
$('#btnReset').on('click', function(e) {
  // 阻止表单的默认重置行为
  e.preventDefault()
  initUserInfo()
})
//监听表单的提交事件
$('.layui-form').on('submit',function(e){
  //阻止表单的默认提交行为
  e.preventDefault()
//发起ajax请求
$.ajax({
  method:'POST',
  url:'/my/userinfo',
  data:$(this).serialize(),
  success:function(res){
    if(res.status !==0){
      return layer.msg('更新用户信息失败！')
    }
    layer.msg('更新用户信息成功！')
    //调用父页面中的方法，重新渲染用户的头像的用户的信息

//父亲身上所有属性和方法都能使用window.parent
//iframe跨域
    window.parent.getUserInfo()
  }
})
})
})

//options.url 字符串‘/api‘’/my’
// indexOf('/api') !==-1返回的是当前字符串所在的索引位置
// startsWith / endsWith 用来判断当前某个字符或者字符串在哪个位置 开始/结束 返回的是布尔值
// includes用来判断当前某个字符或者字符串是否出现目标字符串里面 返回的布尔值
