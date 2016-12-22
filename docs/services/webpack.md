System is shipped with predefined asset bundles, created with webpack module bundler.

At this point, bundles contain JS files of application dependencies, such as external plugins, core js files and other external assets (such as css files and images).

All Bundles are developed to serve one given application View.

Bundles are named in pretty straightforward way - the name of the bundle suggest the application view, that developer should use it on.
One exception from this rule, is cache bundle (webpack.app_cache.js) - which should be used in all application views, prior to given view bundle. Cache Bundle server the puprose of speeding up the app - it contains all frequently used plugin across all the views.  

Location of bundles in the system:
```
public/webpack/
```

---
 
List of existing Bundles: (CV stands for Complete View)

### webpack.app_cache.js ( cache bundle)
### webpack.CV_all.js ( Bundle containing all other CV Bundles - serves a testing purpose only) 
### webpack.CV_brand_settings ( Brand Settings View, including Email Templates )
### webpack.CV_comments ( Demo of Vue Comment )
### webpack.CV_dashboard (Dashboard View, including gridstack and D3 library)
### webpack.CV_datatables (Datatables View, including Context Menu)
### webpack.CV_settings ( Forms and App Settings View - containing all basic forms plugins)
