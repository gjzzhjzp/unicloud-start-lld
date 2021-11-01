<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" collection="jz-opendb-resources" field="categories,labels,author,title,article_status,comment_status,avatar,resources,zy_gs,excerpt,content" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>分类</text>
          <text>{{data.categories}}</text>
        </view>
        <view>
          <text>标签</text>
          <text>{{data.labels}}</text>
        </view>
        <view>
          <text>作者</text>
          <text>{{data.author}}</text>
        </view>
        <view>
          <text>标题</text>
          <text>{{data.title}}</text>
        </view>
        <view>
          <text>文章状态</text>
          <text>{{options.article_status_valuetotext[data.article_status]}}</text>
        </view>
        <view>
          <text>开放评论</text>
          <text>{{options.comment_status_valuetotext[data.comment_status]}}</text>
        </view>
        <view>
          <text>封面大图</text>
          <uni-file-picker v-if="data.avatar && data.avatar.fileType == 'image'" :value="data.avatar" :file-mediatype="data.avatar && data.avatar.fileType" return-type="object" readonly></uni-file-picker>
          <uni-link v-else-if="data.avatar" :href="data.avatar.url" :text="data.avatar.url"></uni-link>
          <text v-else></text>
        </view>
        <view>
          <text>附件资源</text>
          <template v-for="(file, j) in data.resources">
            <uni-file-picker v-if="file.fileType == 'image'" :value="file" :file-mediatype="file.fileType" return-type="object" readonly></uni-file-picker>
            <uni-link v-else :href="file.url" :text="file.url"></uni-link>
          </template>
        </view>
        <view>
          <text>资源格式</text>
          <text>{{data.zy_gs}}</text>
        </view>
        <view>
          <text>摘要</text>
          <text>{{data.excerpt}}</text>
        </view>
        <view>
          <text>内容</text>
          <text>{{data.content}}</text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/jz-opendb-resources.js';

  export default {
    data() {
      return {
        queryWhere: '',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
