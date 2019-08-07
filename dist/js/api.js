/*
 * Author: 王岩
 * Date: 2019-8-7
 * Description: 网页API请求
 **/

$(function () {
  'use strict';
  var baseUrl = 'http://127.0.0.1:3000/v1/api';

  $('#login').click(function () {
    var account = $("#account").val();
    var password = $("#password").val();
    $.ajax({
      url: baseUrl + '/public/login/ms',
      type: 'POST',
      data: {
        account: account,
        password: password
      },
      success: function (data) {
        if (data.code == 200) {
          window.location.href = 'index.html';
          window.sessionStorage.setItem('major', data.data.role);
          window.sessionStorage.setItem('token', data.data.token);
        } else {
          alert('用户名或密码错误');
        }
      }
    })
  });

  $.Api = function () {

  };

  $.Api.getPointList = function (dom) {
    $.ajax({
      url: baseUrl + '/major/point',
      type: 'GET',
      data: {
        year: 2014,
        option: 'L1'
      },
      headers: {
        'Authorization': window.sessionStorage.getItem('token')
      },
      success: function (data) {
        if (data.code == 200) {
          var arr = [];
          data.data.forEach(function (data, key) {
            arr.push([key, data.point, data.msg == null ? '暂未填写' : data.msg, data.m == null ? '暂未填写' : data.m]);
          })
          dom.DataTable({
            data: arr,
            columns: [
              {
                title: '显示次序',
                width: '70px',
                sClass: 'text-center'
              },
              {
                title: '一级指标点(编号)',
                width: '120px',
                sClass: 'text-center'
              },
              {
                title: '描述信息',
                sClass: 'text-center'
              },
              {
                title: '简述信息',
                width: '100px',
                sClass: 'text-center'
              }
            ]
          });
        }
      }
    })
  }

  $.Api.getIndexPointList = function (table, point) {
    $.ajax({
      url: baseUrl + '/major/indexPoint',
      type: 'GET',
      data: {
        year: 2014,
        L1: point
      },
      headers: {
        'Authorization': window.sessionStorage.getItem('token')
      },
      success: function (data) {
        if (data.code == 200) {
          var arr = [];
          data.data.forEach(function (data, key) {
            arr.push([key, data.point, data.msg == null ? '暂未填写' : data.msg, data.m == null ? '暂未填写' : data.m]);
          })
          table.clear();
          table.rows.add(arr);
          table.draw();
        }
      }
    })
  }
});