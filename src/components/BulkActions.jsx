import { CheckCircleIcon, PauseCircleIcon, TrashIcon } from './Icons';
import BulkActionButton from './BulkActionButton';

export default function BulkActions({ onMarkAllDone, onMarkAllOpen, onDeleteAll }) {
  return (
    <div className="mb-6 flex justify-center gap-3">
      <BulkActionButton
        variant="success"
        icon={<CheckCircleIcon />}
        onClick={onMarkAllDone}
      >
        All Done
      </BulkActionButton>

      <BulkActionButton
        variant="info"
        icon={<PauseCircleIcon />}
        onClick={onMarkAllOpen}
      >
        All Open
      </BulkActionButton>

      <BulkActionButton
        variant="danger"
        icon={<TrashIcon />}
        onClick={onDeleteAll}
      >
        Delete All
      </BulkActionButton>
    </div>
  );
}
