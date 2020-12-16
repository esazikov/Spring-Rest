package springrest.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springrest.handlers.CurrentUserInterceptor;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Autowired
    CurrentUserInterceptor currentUserInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(currentUserInterceptor);
    }
}
