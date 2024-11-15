import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // Importa la librería de splash screen

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // Muestra el splash screen
        super.onCreate(savedInstanceState);
    }
}
