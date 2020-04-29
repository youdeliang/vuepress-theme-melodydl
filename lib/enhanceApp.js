import { Pagination, Icon, Tag } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss';

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // 按需引入
  Vue.use(Pagination);
  Vue.use(Tag);
  Vue.use(Icon);
}