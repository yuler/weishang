<template>
    <div class="viewports">
    	<div class="container">
    	    <form class="user-edit" @submit.prevent="save">
            	<div class="floor-item">
                    	<div class="detail-box margin-space-s">
                          <div class="box-item split-line">
                          <label for="">用户名称：</label>
                          			<input type="text" placeholder="请输入用户名" v-model="user.name" required>
                          </div>
                          <div class="box-item split-line">
                          <label for="">手机号码：</label>
                          			<input type="tel" placeholder="请输入手机号码" v-model="user.mobile" disabled="true">
                          </div>
                          <div class="box-item">
                          <label for="">用户地址：</label>
                          			<input type="text" placeholder="请输入用户地址" v-model="user.address" required>
                          </div>
                          <div class="box-item">
                          <label for="">姓名：</label>
                                <input type="text" placeholder="请输入姓名" v-model="user.name" required>
                          </div>
                          <div class="box-item" >
                            <button class="btn full-btn" type="submit">保存</button>
                          </div>
                        </div>
                 </div>
            	</form>
    	</div>
    </div>
</template>

<script>
import api from '../api.js'

export default {
  data () {
    return {
      user: {}
    }
  },
  route: {
    data() {
      api.user.me()
        .then( res => {
          this.user = res.data
        }, err => {
          if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
        })
    }
  },
  methods: {
    save () {
      api.user.update( this.user )
        .then( res => {
          // this.$router.go({name: 'me', replace: true})
          window.history.back();
          this.$router.app.snackbar('success', '保存成功')
        }, err => {
          if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
        })
    }
  }

}
</script>

<style>
    .user-edit .detail-box{}
    .user-edit .box-item{font-size: 16px;color: #666666;padding: 16px 0 16px 0;}
    .user-edit .box-item .cash-number{font-size: 15px;}
    .user-edit .box-item .btn-info{float: right;padding:4px 15px;}
    .user-edit .box-item .add-card,.card-remove{float: right;}
    .user-edit .box-item .bank-name{display: inline-block;width: 75px;}
    .user-edit .floor-item{
    	margin:0;
    }
    .user-edit .floor-item .box-item{
    	padding:10px 0;
    }
    .user-edit .floor-item .box-item input{
    	    font-size: 14px;
            display: inline-block;
            padding: 4px 12px;
            width: calc(100% - 44px);
            height: 44px;
            border-radius:4px;
            border: 1px solid #dfbd98;
            box-sizing: border-box;
            width:100%;
    }
    .user-edit .floor-item .box-item label{
        padding:5px 0;
        display:inline-block;
    }
</style>