import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people,man } from 'ionicons/icons';
import TasksPage from './TasksPage';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import TaskDetail from './SessionDetail';
import About from './About';
import PlotComponent from '../components/PlotComponent'
import Mood from './Mood'

import Mind from './Mind';
import Talks from './Talks';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/tasks" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.

        */}
        <Route path="/tabs/tasks" render={() => <TasksPage />} exact={true} />
        <Route path="/tabs/speakers" render={() => <SpeakerList />} exact={true} />
        <Route path="/tabs/speakers/:id" component={SpeakerDetail} exact={true} />
        <Route path="/tabs/task/:id" component={TaskDetail} />
        <Route path="/tabs/speakers/sessions/:id" component={TaskDetail} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
        <Route path="/tabs/mood" render={() => <Mood />} exact={true} />

        
        <Route path="/tabs/mind" render={() => <Mind />} exact={true} />
        <Route path="/tabs/talks" render={() => <Talks />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Tasks" href="/tabs/tasks">
          <IonIcon icon={calendar} />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>      
        <IonTabButton tab="mind" href="/tabs/mind">
          <IonIcon icon={man} />
          <IonLabel>Mind</IonLabel>
        </IonTabButton>
        <IonTabButton tab="talks" href="/tabs/talks">
          <IonIcon icon={people} />
          <IonLabel>Inspiration</IonLabel>
          <IonLabel>Talks</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mood" href="/tabs/mood">
          <IonIcon icon={informationCircle} />
          <IonLabel>Mood</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;