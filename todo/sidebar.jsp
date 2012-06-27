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
			<td style="text-align: left;">待办</td>
			<td style="text-align: right;">
				<ul class="inputIcons">
					<li class="custom inputIcon ui-icon ui-icon-folder-open"></li>
				</ul>
			</td>
		</tr>
	</table>

	<div class="ui-widget-content">这里输出待办列表</div>
</div>