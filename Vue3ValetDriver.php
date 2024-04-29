<?php

class Vue3ValetDriver extends ValetDriver
{
    public function serves($sitePath, $siteName, $uri)
    {
        return file_exists($sitePath.'/index.html');
        // return file_exists($sitePath.'/vite.config.js') && file_exists($sitePath.'/index.html');
    }

    public function isStaticFile($sitePath, $siteName, $uri)
    {
        if (file_exists($staticFilePath = $sitePath.'/dist/'.$uri)) {
            return $staticFilePath;
        }

        return false;
    }

    public function frontControllerPath($sitePath, $siteName, $uri)
    {
        return $sitePath.'/dist/index.html';
    }
}