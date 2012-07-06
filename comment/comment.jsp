<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-page" title='<s:property value="title"/>'
	data-saveUrl='<s:url value="/bc-workflow/comment/save" />'
	data-js='<s:url value="/bc-workflow/comment/comment.js"/>'
	data-initMethod='bc.flow.comment.init'
	data-option='<s:property value="pageOption"/>' style="overflow-y: auto;">
	<s:form name="workflowCommentForm" theme="simple" >
		<table  cellspacing="2" cellpadding="0" style="width:545px;"  >
			<tbody>
				<tr class="widthMarker">
					<td style="width: 80px;"></td>
					<td >&nbsp;</td>
				</tr>
				<tr>
					<td class="topLabel">
						*意见:
					</td>		
					<td class="value">
						<s:if test="isOpen">
							<s:textarea rows="4" name="comment"  readonly="true" cssClass="ui-widget-content noresize" data-validate="required" />
						</s:if><s:else>
							<s:textarea rows="4" name="comment"  cssClass="ui-widget-content noresize" data-validate="required" />
						</s:else>
					</td>		
				</tr>
				<tr>
					<td class="label" colspan="2">
						<div class="formTopInfo">
							<s:if test="isNew()">
								<s:property value="actorName" /> &nbsp;<s:date name="time" format="yyyy-MM-dd HH:mm:ss"/>
							</s:if><s:else>
								<s:property value="actorName" />，最后修改：<s:date name="time" format="yyyy-MM-dd HH:mm:ss"/>
							</s:else>
						</div>
					</td>		
				</tr>			
			</tbody>
		</table>
		<s:hidden name="id" />
		<s:hidden name="procId" />
		<s:hidden name="tid" />
	</s:form>
</div>