<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="sidebar-todo"
	data-js='<s:url value="/bc-workflow/todo/sidebar.js"/>'
	data-initMethod='bc.sidebar.todo.init' style="overflow-y: auto;">
	<table class="ui-widget-header" cellspacing="0" cellpadding="0"
		style="width: 100%;">
		<tr>
			<td style="width: 16px;"><span
				class="custom inputIcon ui-icon ui-icon-calendar"></span></td>
			<td style="text-align: left;">待办事项</td>
			<td style="text-align: right;">
				<ul class="inputIcons">
					<li class="custom inputIcon ui-icon ui-icon-folder-open"></li>
				</ul>
			</td>
		</tr>
	</table>
	<s:iterator value="todoList">
		<table class="ui-widget-content" cellspacing="0" cellpadding="0">
			<tr>
				<td class="ui-widget-content" style="width: 30px;height:20px;text-align: center;vertical-align: top;border-width: 0px 1px 1px 0px;" >
					<img id="portrait" style="width:30px;height:30px;cursor: pointer;" 
						src='<s:url value="/bc/image/userPortrait"></s:url>?code=admin'/>
				</td>
				<td>
				   <table class="ui-widget-content"  cellspacing="0" cellpadding="0" style="width: 100%;border-width: 0px 0px 1px 0px;">
						<tr>
							<td>
								<s:if test="%{['todoType'] == 0}">
									<span class="ui-icon ui-icon-person"></span>
								</s:if>
								<s:else>
									<span class="ui-icon ui-icon-contact"></span>
								</s:else>
							</td>
							<td>
								<s:if test="%{['isTimeOver'] == true}">
									<span class="ui-icon ui-icon-clock"></span>
								</s:if>
							</td>
							<td style="width: 126px;text-align: left;font-size: 14px;"><span style="margin-left: 2px;"><s:property value="%{['title']}"/></span></td>
							<td style="width: 60px;text-align: right;"><s:property value="%{['createTime']}" /></td>
						</tr>
						<tr>
							<td colspan="3" style="text-align: left;"><span style="margin-left: 2px;"><s:property value="%{['description']}"/></span></td>
						</tr>
				   </table>
				</td>
			</tr>
	</table>
	</s:iterator>
</div>