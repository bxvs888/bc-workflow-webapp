bc.namespace("bc.flow.workspace");
bc.flow.workspace = {
	init : function() {
		var $page = $(this);
		var $common = $page.children(".common");
		
		// 记录流程实例的id
		var id = $page.find("input[name='id']").val();
		var subject = $page.find("input[name='subject']").val();
		
		// 查看异常堆栈信息
		$page.children(".error").find(".click2see").click(function(){
			$(this).parent().next().toggleClass("hide");
		});
		
		// 总区域的折叠或展开
		$page.delegate(".header>.rightIcons>.toggle",{
			click: function(e) {
				var $this = $(this);
				$this.children(".ui-icon").toggleClass("ui-icon-triangle-1-n ui-icon-triangle-1-s");
				$this.closest(".header").siblings(".info").toggleClass("hide");
				
				return false;
			}
		});
		
		// 反转详细信息区域的显示
		$page.delegate(".header>.rightIcons>.reverse",{
			click: function(e) {
				var $infos = $(this).closest(".header").siblings(".info");
				$infos.toggleClass("collapse");
				$infos.find(">.simple>.line>.rightIcons>.toggle>.ui-icon").toggleClass("ui-icon-carat-1-sw ui-icon-carat-1-ne");
				return false;
			}
		});
		
		// 单个内部细节的折叠或展开
		$page.delegate(".info>.simple>.line>.rightIcons>.toggle",{
			click: function(e) {
				var $this = $(this);
				$this.children(".ui-icon").toggleClass("ui-icon-carat-1-sw ui-icon-carat-1-ne");
				
				var $info = $this.closest(".info");
				$info.toggleClass("collapse");
				
				return false;
			}
		});
		
		// 公共信息区添加意见、附件，待办信息区添加意见、附件、完成办理、分派任务、签领任务
		$page.delegate(".common>.header>.rightIcons>.mainOperate,.todo>.info>.simple>.line>.rightIcons>.mainOperate",{
			click: function(e) {
				var $this = $(this);
				if($this.is(".flowImage")){// 查看流程图
					window.open(bc.root + "/bc-workflow/workflow/diagram?id=" + id,"_blank");
				}else if($this.is(".excutionLog")){// 查看流转日志
					bc.page.newWin({
						name:subject,mid:"excutionLog"+id,
						url: bc.root + "/bc-workflow/excutionLogs/list?pid="+id
					});
				}else if($this.is(".addComment")){// 添加意见
					bc.flowattach.create({
						type:2,
						common:true,
						pid: id,
						onOk:function(json){
							alert($.toJSON(json));
							var simpleLine = bc.flow.workspace.TPL.LINE.format("comment","ui-icon-comment","link",json.desc, bc.flow.workspace.TPL.COMMENT_BUTTONS);
							var detailLine = bc.flow.workspace.TPL.TEXT_LINE.format(json.author + " " + json.fileDate);
							var info = bc.flow.workspace.TPL.INFO.format(json.id,"","","",simpleLine,detailLine,"low little");
							$common.append(info);
						}
					});
				}else if($this.is(".addAttach")){// 添加附件
					bc.flowattach.create({
						type:1,
						common:true,
						pid: id,
						onOk:function(json){
							alert($.toJSON(json))
						}
					});
				}else if($this.is(".finish")){// 添加附件
					alert("TODO:完成办理");
				}else if($this.is(".delegate")){// 委派任务
					alert("TODO:委派任务");
				}else if($this.is(".claim")){// 签领任务
					alert("TODO:签领任务");
				}else if($this.is(".assign ")){// 分配任务
					alert("TODO:分配任务");
				}else{
					alert("TODO:添加??,class=" + $this.attr("class"));
				}
				
				return false;
			}
		});
		
		// 点击表单、意见、附件
		$page.delegate(".line>.text",{
			click: function(e) {
				var $line = $(this).closest(".line");
				if($line.is(".form")){// 打开表单
					alert("TODO:打开表单");
				}else if($line.is(".comment")){// 打开意见
					alert("TODO:打开意见");
				}else if($line.is(".attach")){// 打开附件
					alert("TODO:打开附件");
				}
				
				return false;
			}
		});
		
		// 表单、意见、附件的操作按钮
		$page.delegate(".line>.rightIcons>.itemOperate",{
			click: function(e) {
				var $this = $(this);
				var $info = $this.closest(".info");
				if($this.is(".edit")){// 编辑
					bc.flowattach.edit({
						id: $info.data("id"),
						onOk:function(json){
							alert($.toJSON(json))
						}
					});
				}else if($this.is(".open")){// 查看
					bc.flowattach.open({
						id: $info.data("id")
					});
				}else if($this.is(".download")){// 下载
					bc.flowattach.download({
						subject: $info.data("subject"),
						path: $info.data("path")
					});
				}else if($this.is(".delete")){// 删除
					bc.flowattach.delete_({
						id: $info.data("id"),
						onOk:function(json){
							alert($.toJSON(json))
						}
					});
				}
				
				return false;
			}
		});
	}
};

/** 页面模板 */
bc.flow.workspace.TPL={};
bc.flow.workspace.TPL.ITEM_BUTTON = '<span class="itemOperate {0}"><span class="ui-icon {2}"></span><span class="text link">{1}</span></span>';
bc.flow.workspace.TPL.ITEM_BUTTON_EDIT = bc.flow.workspace.TPL.ITEM_BUTTON.format("edit","编辑","ui-icon-pencil");
bc.flow.workspace.TPL.ITEM_BUTTON_OPEN = bc.flow.workspace.TPL.ITEM_BUTTON.format("open","查看","ui-icon-document-b");
bc.flow.workspace.TPL.ITEM_BUTTON_DOWNLOAD = bc.flow.workspace.TPL.ITEM_BUTTON.format("download","下载","ui-icon-arrowthickstop-1-s");
bc.flow.workspace.TPL.ITEM_BUTTON_DELETE = bc.flow.workspace.TPL.ITEM_BUTTON.format("delete","删除","ui-icon-closethick");
	
bc.flow.workspace.TPL.COMMENT_BUTTONS = bc.flow.workspace.TPL.ITEM_BUTTON_EDIT+bc.flow.workspace.TPL.ITEM_BUTTON_OPEN+bc.flow.workspace.TPL.ITEM_BUTTON_DELETE;
bc.flow.workspace.TPL.ATTACH_BUTTONS = bc.flow.workspace.TPL.ITEM_BUTTON_EDIT+bc.flow.workspace.TPL.ITEM_BUTTON_OPEN+bc.flow.workspace.TPL.ITEM_BUTTON_DOWNLOAD+bc.flow.workspace.TPL.ITEM_BUTTON_DELETE;

bc.flow.workspace.TPL.LINE = [
	'<div class="line {0}">'
	,'	<span class="leftIcon ui-icon {1}"></span>'
	,'	<span class="text {2}">{3}</span>'
	,'	<span class="rightIcons">{4}'
	,'		<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>'
	,'	</span>'
	,'</div>'
].join("");

bc.flow.workspace.TPL.TEXT_LINE = [
	'<div class="line">'
	,'	<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>'
	,'	<span class="text">{0}</span>'
	,'</div>'
].join("");

bc.flow.workspace.TPL.INFO = [
	'<div class="info ui-widget-content" data-id="{0}" data-subject="{1}" data-size="{2}" data-path="{3}">'
	,'	<div class="simple">{4}</div>'
	,'	<div class="detail {6}">{5}</div>'
	,'</div>'
].join("");

