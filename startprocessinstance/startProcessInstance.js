/**
 * 选择发起流程
 * @param {Object} option 配置参数
 * @option {Boolean} isNewVersion [可选]是否只显示最新版本,默认true						
 * @option {Boolean} multiple [可选]是否允许多选，默认false
 * @option {Boolean} paging [可选]是否分页，默认false
 * @option {Function} onOk 选择完毕后的回调函数，，
 * 单选返回一个对象 格式为{
 * 					id:[id],
 * 					name:[name],			--名称
 * 					key:[key],			--key值
 * 					deployTime:[deployTime]			--部署时间
 * 					}
 * 如果为多选则返回的是对象集合，[对象1,对象2]。
 */
bc.selectStartProcessInstance = function(option) {
	// 构建默认参数
	option = jQuery.extend({
		mid: 'selectStartProcessInstance',
		paging: false,
		title: '选择需要发起的流程'
	},option);
	
	// 将一些配置参数放到data参数内(这些参数是提交到服务器的参数)
	option.data = jQuery.extend({
		multiple: true,
		isNewVersion : false
	},option.data);
	if (option.title)
		option.data.title = option.title;
	if(option.multiple === true)
		option.data.multiple = true;
	if(option.isNewVersion === true)
		option.data.isNewVersion = true;
	
	//弹出选择对话框
	bc.page.newWin(jQuery.extend({
		url: bc.root + "/bc-workflow/selectStartProcessInstance/"+ (option.paging ? "paging" : "list"),
		name: option.title,
		mid: option.mid,
		afterClose: function(status){
			if(status && typeof(option.onOk) == "function"){
				option.onOk(status);
			}
		}
	},option));
}