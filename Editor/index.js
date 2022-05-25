import Window from './UI/Window/Window.js';
import WindowManager from './UI/Window/WindowManager.js';

class TestWindow extends Window{
    
}

var windowManager = new WindowManager();

var window = new TestWindow();

windowManager.add(window);