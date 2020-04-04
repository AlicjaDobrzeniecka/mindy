import React, { useState, useRef } from 'react';

import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonTextarea, IonFab, IonFabButton } from '@ionic/react';
import { options, search, addOutline } from 'ionicons/icons';

import TaskList from '../components/TaskList';
import SessionListFilter from '../components/SessionListFilter';
import './TasksPage.scss'

import ShareSocialFab from '../components/ShareSocialFab';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { setSearchText, removeTask } from '../data/sessions/sessions.actions';
import { Schedule as Task } from '../models/Schedule';

interface OwnProps { }

interface StateProps {
  taskList: Task;
  favoritesSchedule: Task;
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  removeTask : typeof removeTask;
}

type TasksPageProps = OwnProps & StateProps & DispatchProps;

const TasksPage: React.FC<TasksPageProps> = ({ favoritesSchedule, taskList: schedule, setSearchText, mode, removeTask}) => {
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };
  const [showTaskDeletedToast, setShowTaskDeletedToast] = useState(false);
  const addTask = (title: string) => {
    console.log('tasks.new called')
  };
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              {/* <IonSegmentButton value="all">
                All
              </IonSegmentButton> */}
              {/* <IonSegmentButton value="favorites">
                Favorites
              </IonSegmentButton> */}
            </IonSegment>
          }
          {!ios && !showSearchbar &&
            <IonTitle>My Tasks</IonTitle>
          }
          {showSearchbar &&
            <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
          }

          <IonButtons slot="end">
            {!ios && !showSearchbar &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
            {!showSearchbar &&
              <IonButton onClick={() => setShowFilterModal(true)}>
                {mode === 'ios' ? 'Filter' : <IonIcon icon={options} slot="icon-only" />}
              </IonButton>
            }
          </IonButtons>
        </IonToolbar>

        {!ios && null
          // <IonToolbar>
          //   <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
          //     {/* <IonSegmentButton value="all">
          //       All
          //     </IonSegmentButton> */}
          //     {/* <IonSegmentButton value="favorites">
          //       Favorites
          //     </IonSegmentButton> */}
          //   </IonSegment>
          // </IonToolbar>
        }
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        <TaskList
          tasks={schedule}
          listType={segment}
          hide={segment === 'favorites'}
          onRemoveTask={id=>removeTask(id)}
        />
        <TaskList
          // schedule={schedule}
          tasks={favoritesSchedule}
          listType={segment}
          hide={segment === 'all'}
          onRemoveTask={id=> removeTask(id)}
        />
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
        cssClass="session-list-filter"
      >
        <SessionListFilter
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>

      <ShareSocialFab />
      <IonModal isOpen={showNewTaskModal}>
          <h1>Create a new task</h1>
            <IonTextarea
              value={newTask}
              placeholder="Task details...."
              onIonChange={(e) => setNewTask(e.detail.value!)}
            ></IonTextarea>
          <IonButton
            onClick={() => {
              addTask(newTask);
              setShowNewTaskModal(false);
            }}
          >
            OK
          </IonButton>
        </IonModal>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon
              icon={addOutline}
              onClick={() => setShowNewTaskModal(true)}
            />
          </IonFabButton>
        </IonFab>
        <IonToast
          isOpen={showTaskDeletedToast}
          message="Task has been completed."
          duration={2000}
        />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    taskList: selectors.getSearchedSchedule(state),
    favoritesSchedule: selectors.getGroupedFavorites(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText,
    removeTask
  },
  component: React.memo(TasksPage)
});