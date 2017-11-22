<?php 

/**
 *
 * @param string $type css or js
 * @param string path
 * 
 * @return string
 */
function resourcePath($type, $path)
{

    $manifest = __DIR__ . '/../manifest-' . $type . '.json';   

    $str = file_get_contents($manifest);

    $resource = json_decode($str, true);

    if (isset($resource[$path])) {

        $p = $resource[$path];

        $p = explode('/', $p);

        $path = end($p);

    }

    return $path;

}