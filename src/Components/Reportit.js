import React from "react";
import "./app.css";

function Reportit() {
  return (
    <div class="footer-top ctools-collapsible-container ctools-collapsible-processed">
      <span class="ctools-toggle"></span>
      <div class="column footer-top__tab-handle ctools-collapsible-handle">
        <div class="footer-top__tab-label">Report a problem with this page</div>
      </div>
      <div class="footer-top__tab-border"></div>
      <div
        class="column sp-content footer-top__content ctools-collapsible-content"
        style="display: block; overflow: hidden;"
      >
        <div id="webform-ajax-wrapper-14966">
          <div
            id="clientsidevalidation-webform-client-form-14966-errors"
            class="messages error clientside-error icon-error"
            style="display: none;"
          >
            <ul></ul>
          </div>
          <form
            class="webform-client-form"
            enctype="multipart/form-data"
            action="/sitewide-feedback-form"
            method="post"
            id="webform-client-form-14966"
            accept-charset="UTF-8"
            novalidate="novalidate"
          >
            <div>
              <div
                class="form-item webform-component webform-component-markup"
                id="webform-component-intro-text"
              >
                <h2>Tell us your feedback</h2>
                <p>
                  Please don’t give personal details like contact details or
                  credit card numbers. We are unable to reply to feedback sent
                  via this form.
                </p>
              </div>
              <div
                class="form-item webform-component webform-component-select"
                id="webform-component-please-select-the-relevant-department"
              >
                <label for="edit-submitted-please-select-the-relevant-department">
                  Please select the feedback type{" "}
                  <span class="form-required" title="This field is required.">
                    *
                  </span>
                </label>
                <select
                  class=" form-select required"
                  id="edit-submitted-please-select-the-relevant-department"
                  name="submitted[please_select_the_relevant_department]"
                >
                  <option value="" selected="selected">
                    - Select -
                  </option>
                  <option value="Content">
                    Content (information is missing, unclear or incorrect)
                  </option>
                  <option value="Technical">
                    Technical (page is not working as expected)
                  </option>
                </select>
              </div>
              <div
                class="form-item webform-component webform-component-textfield"
                id="webform-component-what-you-were-doing"
              >
                <label for="edit-submitted-what-you-were-doing">
                  What were you doing?{" "}
                  <span class="form-required" title="This field is required.">
                    *
                  </span>
                </label>
                <input
                  class=" form-text required"
                  type="text"
                  id="edit-submitted-what-you-were-doing"
                  name="submitted[what_you_were_doing]"
                  value=""
                  size="60"
                  maxlength="200"
                />
              </div>
              <div
                class="form-item webform-component webform-component-textfield"
                id="webform-component-what-went-wrong"
              >
                <label for="edit-submitted-what-went-wrong">
                  What went wrong?{" "}
                  <span class="form-required" title="This field is required.">
                    *
                  </span>
                </label>
                <input
                  class=" form-text required"
                  type="text"
                  id="edit-submitted-what-went-wrong"
                  name="submitted[what_went_wrong]"
                  value=""
                  size="60"
                  maxlength="200"
                />
              </div>

              <p>
                Read our{" "}
                <a href="/data-protection" target="blank">
                  data protection notice
                </a>{" "}
                to learn about how the council complies with data protection
                laws when processing your data.
              </p>

              <input type="hidden" name="details[sid]" />
              <input type="hidden" name="details[page_num]" value="1" />
              <input type="hidden" name="details[page_count]" value="1" />
              <input type="hidden" name="details[finished]" value="0" />
              <label>
                <span class="report-inactive">Form Build Id</span>
                <input
                  type="hidden"
                  name="form_build_id"
                  value="form-xjx8inCBRBDqQM1prdTNHSj3tk6Lg2D-hSI5pO_CEeM"
                />
              </label>
              <label>
                <span class="report-inactive">Form Id</span>
                <input
                  type="hidden"
                  name="form_id"
                  value="webform_client_form_14966"
                />
              </label>
              <input
                type="hidden"
                name="webform_ajax_wrapper_id"
                value="webform-ajax-wrapper-14966"
              />
              <div class="form-actions form-wrapper" id="edit-actions--2">
                <input
                  class="button form-submit ajax-processed"
                  type="submit"
                  id="edit-webform-ajax-submit-14966"
                  name="op"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default Reportit;
