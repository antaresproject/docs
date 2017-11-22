<?php

$directory = new RecursiveDirectoryIterator('../docs');

$Iterator = new RecursiveIteratorIterator($directory);
$regex    = new RegexIterator($Iterator, '/^.+\.md$/i', RecursiveRegexIterator::GET_MATCH);

foreach ($regex as $file) {
    $filename = __DIR__ . DIRECTORY_SEPARATOR . $file[0];
    $content  = file_get_contents($filename);

    try {
        $replaced = replaceCodehiliteIndent($content);
    } catch (Exception $ex) {
        $replaced = $content;
    }
    file_put_contents($filename, $replaced);
}

exit;

function replaceCodehiliteIndent($content)
{

    preg_match_all("'   ```(.*?)   ```'si", $content, $match);
    foreach ($match[0] as $string) {
        $original = $string;
        $string   = str_replace('  ', '       ', $string);
        preg_match_all("'```(.*?)\n'si", $string, $matches);

        if (isset($matches[0][0])) {

            $element = str_replace('```', ':::', $matches[0][0]);
            $string  = str_replace($matches[0][0], $element, $string);
            preg_match_all("'(.*?):::'si", $string, $matches2);
            $string  = str_replace($matches2[0][0], "\n        :::", $string);
            $string  = str_replace('```', '', $string);
        }
        $content = str_replace($original, $string, $content);
    }
    return $content;
}
