bc.namespace("bc.flow.workspace");
bc.flow.workspace = {
	init : function() {
		var $page = $(this);
		
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
				if($this.is(".addComment")){// 添加意见
					alert("TODO:添加意见");
				}else if($this.is(".addAttach")){// 添加附件
					alert("TODO:添加附件");
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
				var $line = $this.closest(".line");
				if($this.is(".edit")){// 编辑
					alert("TODO:编辑");
				}else if($this.is(".open")){// 查看
					alert("TODO:查看");
				}else if($this.is(".download")){// 下载
					alert("TODO:下载");
				}else if($this.is(".delete")){// 删除
					alert("TODO:删除");
				}
				
				return false;
			}
		});
	}
};