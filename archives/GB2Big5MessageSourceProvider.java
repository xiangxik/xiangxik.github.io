package com.cyberway.modules.i18n.gb2big5;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;

import com.cyberway.modules.i18n.AbstractMessageSourceProvider;
import com.cyberway.modules.i18n.LocaleProvider;
import com.cyberway.modules.i18n.MessageSource;
import com.cyberway.modules.i18n.MessageSourceProvider;
import com.google.common.cache.CacheBuilder;
import com.google.common.io.CharStreams;

public class GB2Big5MessageSourceProvider extends AbstractMessageSourceProvider
{
	public static final String GB_TABLE;
	public static final String BIG5_TABLE;
	
	private ClassLoader _classLoader = Thread.currentThread().getContextClassLoader();
	
	private MessageSourceProvider _gbMessageSourceProvider;
	private Map<Serializable, String> _cache = CacheBuilder.newBuilder().maximumSize(100000).<Serializable, String>build().asMap();
	
	static
	{
		try
		{
			BIG5_TABLE = CharStreams.toString(new InputStreamReader(new ClassPathResource("big5", GB2Big5MessageSourceProvider.class).getInputStream()));
			GB_TABLE = CharStreams.toString(new InputStreamReader(new ClassPathResource("gb", GB2Big5MessageSourceProvider.class).getInputStream()));
		}
		catch (IOException ex)
		{
			throw new RuntimeException(ex);
		}
	}
	
	Map<Serializable, String> getCache()
	{
		return _cache;
	}
	
	public ClassLoader getClassLoader()
	{
		return _classLoader;
	}
	
	public void setClassLoader(ClassLoader classLoader)
	{
		_classLoader = classLoader;
	}
	
	public MessageSourceProvider getGbMessageSourceProvider()
	{
		return _gbMessageSourceProvider;
	}
	
	public void setGbMessageSourceProvider(MessageSourceProvider gbMessageSourceProvider)
	{
		_gbMessageSourceProvider = gbMessageSourceProvider;
	}
	
	@Override
	protected MessageSource createMessageSource(String baseName, LocaleProvider localeProvider)
	{
		return new GB2Big5MessageSource(baseName, localeProvider, this, getClassLoader());
	}
}
