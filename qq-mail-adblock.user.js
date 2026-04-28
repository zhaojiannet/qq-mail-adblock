// ==UserScript==
// @name         QQ邮箱VIP广告屏蔽
// @name:en      QQ Mail VIP Ads Blocker
// @namespace    https://github.com/zhaojiannet/qq-mail-adblock
// @version      1.0.0
// @description  屏蔽新版QQ邮箱中的VIP会员推广广告
// @description:en  Hide VIP membership promotions in the new QQ Mail web client.
// @author       zhaoJian
// @license      MIT
// @match        https://mail.qq.com/*
// @match        https://wx.mail.qq.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @homepageURL  https://github.com/zhaojiannet/qq-mail-adblock
// @supportURL   https://github.com/zhaojiannet/qq-mail-adblock/issues
// @updateURL    https://raw.githubusercontent.com/zhaojiannet/qq-mail-adblock/main/qq-mail-adblock.user.js
// @downloadURL  https://raw.githubusercontent.com/zhaojiannet/qq-mail-adblock/main/qq-mail-adblock.user.js
// ==/UserScript==

(function () {
  'use strict';

  const CSS_RULES = {
    'mail.qq.com': [
      'div.xmail-cmp-vip-float-bubble:has(.cmp-vip-float-bubble-body)',
    ],
    'wx.mail.qq.com': [
      '.cmp-vip-state-icon.cmp-common-state-icon',
      '.xmail-ui-btn:has(.cmp-vip-icon)',
      '.xmail-cmp-vip-embed-bubble',
      'div.xmail-ui-btn.ui-btn-size32.ui-btn-them-clear-gray.footer-btn:nth-of-type(1)',
      '.vip-icon-click.vip-icon-in-panel.cmp-vip-state-icon.common-state-icon',
      '.profile-user-info > .cmp-vip-state-icon.common-state-icon',
      '.cmp-vip-icon-click.cmp-vip-icon-in-panel.cmp-vip-state-icon.cmp-common-state-icon',
      'div.setting-group:nth-of-type(1)',
      '.content-time',
      '.xmail-cmp-vip-banner-common',
      '.mail-setting-storage > div.setting-item-wrap:nth-of-type(2) > div.setting-item-row:nth-of-type(2)',
      '.setting-item-wrap.mail-setting-themes > div.setting-item-row:nth-of-type(1)',
      '.setting-item-wrap.mail-setting-themes > div.setting-item-row:nth-of-type(2) > .setting-theme-cards',
      '.setting-item-wrap.mail-setting-themes > div.setting-item-row:nth-of-type(3)',
      '.inactive-account-table',
      '.xmail-ui-hyperlink.query-head-note',
      '.xmail-ui-hyperlink.ui-hyperlink-is-inline.tab-title-vip-link',
      '.cmp-user-card-info > .xmail-ui-hyperlink',
      '.cmp-streamer-right',
      'div.account_item:nth-of-type(6) > .account_item_left > .account_item_text > .cmp-vip-icon.cmp-vip-icon-click.cmp-vip-icon-size16',
      '.vip_open_tips',
      '.home_content_frame.domain-email-ad > .common_title > .cmp-vip-icon.cmp-vip-icon-click.cmp-vip-icon-size16',
      '.vip-ad-bar',
    ],
  };

  // 需文本匹配的规则（uBlock 的 :has-text 语法在油猴里要自己实现）
  const TEXT_RULES = {
    'mail.qq.com': [
      { selector: 'div.cmp-vip-float-bubble-body', text: '让邮箱更好用' },
    ],
  };

  const host = location.hostname;
  const selectors = CSS_RULES[host];
  const textRules = TEXT_RULES[host];
  const debug = (() => {
    try { return localStorage.getItem('qq-mail-adblock-debug') === '1'; }
    catch (e) { return false; }
  })();

  if (selectors && selectors.length) {
    addStyle(selectors.join(',\n') + ' { display: none !important; }');
    if (debug) console.log('[qq-mail-adblock] CSS rules injected:', selectors.length);
  }

  if (textRules && textRules.length) {
    runTextRules(textRules);
  }

  function addStyle(css) {
    if (typeof GM_addStyle === 'function') {
      try { GM_addStyle(css); return; } catch (e) { /* fall through */ }
    }
    const inject = () => {
      const style = document.createElement('style');
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
    };
    if (document.head || document.documentElement) inject();
    else document.addEventListener('readystatechange', inject, { once: true });
  }

  function runTextRules(rules) {
    const HIDDEN_FLAG = '_qqMailAdblockHidden';

    const sweep = () => {
      for (const { selector, text } of rules) {
        const nodes = document.querySelectorAll(selector);
        for (const el of nodes) {
          if (el.dataset[HIDDEN_FLAG]) continue;
          if (el.textContent && el.textContent.includes(text)) {
            el.style.setProperty('display', 'none', 'important');
            el.dataset[HIDDEN_FLAG] = '1';
            if (debug) console.log('[qq-mail-adblock] text rule hit:', selector, '←', text);
          }
        }
      }
    };

    const start = () => {
      sweep();
      new MutationObserver(sweep).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    };

    if (document.documentElement) start();
    else document.addEventListener('DOMContentLoaded', start, { once: true });
  }
})();
