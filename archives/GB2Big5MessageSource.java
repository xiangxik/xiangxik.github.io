package com.cyberway.modules.i18n.gb2big5;

import static com.cyberway.modules.i18n.gb2big5.GB2Big5MessageSourceProvider.BIG5_TABLE;
import static com.cyberway.modules.i18n.gb2big5.GB2Big5MessageSourceProvider.GB_TABLE;

import java.io.Serializable;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.ObjectUtils;

import com.cyberway.modules.i18n.AbstractMessageSource;
import com.cyberway.modules.i18n.LocaleProvider;
import com.cyberway.modules.i18n.MessageSourceProvider;
import com.cyberway.modules.i18n.MessageStrSubstitutor;
import com.google.common.collect.Lists;

public class GB2Big5MessageSource extends AbstractMessageSource
{  
	public static final String NONE_MESSAGE = "[[-- NONE -- MESSAGE ]]";
	public static final Locale[] BIG5_LOCALES = new Locale[] { Locale.TAIWAN };
			
	private MessageSourceProvider _gbMessageSourceProvider;
	
	public GB2Big5MessageSource(String baseName, 
			LocaleProvider localeProvider, 
			MessageSourceProvider messageSourceProvider, 
			ClassLoader classLoader)
	{
		super (baseName, localeProvider, messageSourceProvider);
		
		_gbMessageSourceProvider = ((GB2Big5MessageSourceProvider)messageSourceProvider).getGbMessageSourceProvider();
	}
	
	protected Map<Serializable, String> getCache()
	{
		return ((GB2Big5MessageSourceProvider)getProvider()).getCache();
	}

	@Override
	protected String getMessageDirect(String key, Locale locale)
	{
		String message = null; 
		if (ArrayUtils.contains(BIG5_LOCALES, locale))
		{
			Serializable cacheKey = Lists.newArrayList(getBaseName(), locale, key);
			
			message = getCache().get(cacheKey);
			if (message == null)
			{
				message = _gbMessageSourceProvider.getMessageSource(getBaseName(), getLocaleProvider())
						.getMessage(key, Locale.SIMPLIFIED_CHINESE);
				
				if (message != null)
				{
					StringBuilder translated = new StringBuilder();
					for (int index = 0; index < message.length(); index++)
					{
						int chIndex = GB_TABLE.indexOf(message.charAt(index));
						
						translated.append(chIndex >= 0 ? BIG5_TABLE.charAt(chIndex) : message.charAt(index));
					}
					
					message = translated.toString();
				}
				
				getCache().put(cacheKey, ObjectUtils.firstNonNull(message, NONE_MESSAGE));
			}
		}
		
		return message == null || ObjectUtils.equals(message, NONE_MESSAGE) ? null : new MessageStrSubstitutor(this, locale).replace(message);
	}
}
