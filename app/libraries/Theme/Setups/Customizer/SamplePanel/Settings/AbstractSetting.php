<?php
declare (strict_types = 1);

namespace My\Theme\Setups\Customizer\SamplePanel\Settings;

use My\Theme\Setups\Customizer\SamplePanel\AbstractSection;
use My\Theme\Utilities\ThemeMods\Sample as SampleMod;
use GrottoPress\Jentil\Setups\Customizer\AbstractSetting as Setting;

abstract class AbstractSetting extends Setting
{
    /**
     * @var AbstractSection
     */
    protected $section;

    public function __construct(AbstractSection $section)
    {
        $this->section = $section;

        parent::__construct($this->section->customizer);
    }

    protected function themeMod(string $setting): SampleMod
    {
        return $this->customizer->app->utilities->themeMods->sample(
            $this->section->id,
            $setting
        );
    }
}
