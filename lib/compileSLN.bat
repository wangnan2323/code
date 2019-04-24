call "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat" x86   

MSBuild C:\inetpub\wwwroot\sara.dd.tjhmbs.sln /t:Rebuild /P:WarningLevel=2;Configuration=release

exit

